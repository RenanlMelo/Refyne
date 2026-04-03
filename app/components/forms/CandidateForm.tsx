import React from "react";
import { User, GitBranch, Briefcase, FileText, Globe, IdCard, AlignLeft, Link, Clock } from "lucide-react";
import { InputField } from "./InputField";
import { FileUpload } from "./FileUpload";
import { SubmitButton } from "./SubmitButton";
import styles from "./CandidateForm.module.scss";

interface ProfileFormProps {
  state: any;
  actions: any;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ state, actions }) => {
  return (
    <form onSubmit={actions.handleSubmit}>
      <div className={styles.formGrid}>
        {/* Column 1: Personal Info */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            Personal Information
          </h3>
          <InputField
            label="Full Name"
            icon={User}
            value={state.fullName}
            onChange={actions.setFullName}
            placeholder="Your full name"
            required={true}
            error={state.fullNameError}
          />
          <InputField
            label="CPF"
            icon={IdCard}
            value={state.cpf}
            onChange={actions.setCpf}
            placeholder="000.000.000-00"
            format="###.###.###-##"
            required={true}
            error={state.cpfError}
          />
          <InputField
            label="Bio"
            icon={AlignLeft}
            as="textarea"
            row={5}
            className={styles.resizeNone}
            value={state.bio}
            onChange={actions.setBio}
            placeholder="Briefly tell us about your trajectory..."
          />
        </div>

        {/* Column 2: Professional Details */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            Professional
          </h3>
          <InputField
            label="Headline"
            icon={Briefcase}
            value={state.headline}
            onChange={actions.setHeadline}
            placeholder="Ex: Senior Full Stack Developer"
          />
          <InputField
            label="Availability"
            as="select"
            value={state.availabilityStatus}
            onChange={actions.setAvailabilityStatus}
          >
            <option value="OPEN_TO_WORK">Open to work</option>
            <option value="NOT_AVAILABLE">Not available</option>
          </InputField>

          <div className={styles.twoColGrid}>
            <InputField
              label="City"
              value={state.city}
              onChange={actions.setCity}
              placeholder="City"
            />
            <InputField
              label="State"
              value={state.addressState}
              onChange={actions.setAddressState}
              placeholder="State/UF"
            />
          </div>
          <InputField
            label="Country"
            value={state.country}
            onChange={actions.setCountry}
            placeholder="Country"
          />
        </div>

        {/* Column 3: Links & Portfolio */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            Links & Social
          </h3>
          <FileUpload
            label="Resume (PDF)"
            selectedFile={state.resumeFile}
            onFileSelect={actions.setResumeFile}
            maxSizeMB={10}
          />
          <InputField
            label="LinkedIn"
            icon={Link}
            value={state.linkedinUrl}
            onChange={actions.setLinkedinUrl}
            placeholder="linkedin.com/in/..."
          />
          <InputField
            label="GitHub"
            icon={GitBranch}
            value={state.githubUrl}
            onChange={actions.setGithubUrl}
            placeholder="github.com/..."
          />
          <InputField
            label="Portfolio"
            icon={Globe}
            value={state.portfolioUrl}
            onChange={actions.setPortfolioUrl}
            placeholder="your-website.com"
          />
        </div>
      </div>

      <div className={styles.submitWrapper}>
        <SubmitButton loading={state.loading} text="Submit Registration" />
      </div>
    </form>
  );
};
